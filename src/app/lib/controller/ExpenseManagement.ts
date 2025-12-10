import expense from "../../lib/models/expenseschema"
import { S3 } from "../utility/AwsS3config";
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
dotenv.config();

interface Colorpickertype {
    [key: string]: string,
}

export const addExpense = async (request: Request) => {
    let userpayload = request.headers.get('UserPayload')
    if (!userpayload) {
        return { status: 400, message: 'Please Try Registering After some time' }
    }
    const loggedinuserdetails = JSON.parse(userpayload)

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    // const userid = formData.get('userid');
    const userid = loggedinuserdetails["id"];
    // const approverid = formData.get('approverid');
    const amount = formData.get('amount');
    const receipt = formData.get('receipt') as File;
    const filename = receipt['name'];
    let imageS3key = `${"Receipts"}/${Date.now()}-${filename}`
    let imagetype = receipt['type'];

    if (!receipt || !imageS3key) {
        return { status: 400, message: "No File Uploaded", error: true }

    }
    const arrayBuffer = await receipt.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    await S3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageS3key,
            ContentType: imagetype,
            Body: buffer,
        })
    )

    if (!title || !description || !category || !userid || !amount) {
        return { status: 400, message: "Please fill in all the required fields", error: true }
    }


    const ExpenseData = await expense.find({ title: title });
    if (ExpenseData.length > 0) {
        return { status: 409, message: "Expense already Exists", error: true }
    }

    const newExpense = await new expense({
        title,
        description,
        category,
        userid,
        // approverid,
        s3key: imageS3key,
        amount
    });

    if (!newExpense) {
        return { status: 500, message: "Failed to Add Expense", error: true }
    }

    await newExpense.save();
    const imagesignedurl = await getSignedUrl(S3,
        new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: newExpense.s3key
        }), { expiresIn: 21600 }
    );

    const ExpenseDatatoObj = newExpense.toObject()
    const newExpenseData = {
        ...ExpenseDatatoObj,
        imagesignedurl,
    }

    return { status: 200, message: "Expense Added Successfully", data: newExpenseData, error: false }
}

export const getAllExpenses = async () => {
    const ExpenseData = await expense.find();
    if (!ExpenseData || ExpenseData.length == 0) {
        return { status: 404, message: "Expense Details Not Found", error: true }
    }
    const FilteredData = ExpenseData.map(({ _id, title, description, amount, category, status, currency, createdAt, costCenter }) => {
        let FormatedDate = null;
        let ColorperStatus = null;
        let Colorpicker: Colorpickertype = {
            "Approved": '#00AD45',
            "Rejected": '#F6110E',
            "Pending": ' #FCC02E',

        }

        if (createdAt) {
            const createdAttoString = createdAt.toISOString();
            const year = createdAttoString.slice(0, 4)
            const month = createdAttoString.slice(5, 7)
            const day = createdAttoString.slice(8, 10);
            FormatedDate = `${day}/${month}/${year}`;
        }

        ColorperStatus = Colorpicker[status] ?? "#888888"

        return {
            id: _id,
            Title: title,
            Category: category,
            Amount: amount,
            Currency: currency,
            Department: costCenter,
            Date: FormatedDate,
            Status: status,
            color: ColorperStatus

        }

    })
    return { status: 200, message: "Expenses Fetched Successfully", error: false, data: FilteredData }
}


export const getSpecificExpense = async (expenseid: string) => {
    const SpecificExpense = await expense.findOne({ _id: expenseid }).populate('userid').populate('approverid');
    if (!SpecificExpense) {
        return { error: true, status: 404, message: "Expense Not Found" }
    }
    const imagesignedurl = await getSignedUrl(S3,
        new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: SpecificExpense.s3key
        }), { expiresIn: 21600 }
    );
    return { error: false, status: 200, message: "User Expense Fetched Successfully", data: { ...SpecificExpense._doc, imagesignedurl } }

}

export const deleteExpense = async (request: Request, expenseid: string) => {

    const findExpense = await expense.findById({ _id: expenseid });
    if (!findExpense) {
        return { status: 404, message: "User Does not Exist", error: true }
    }
    await S3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: findExpense.s3key
        })
    )
    const deletedExpense = await expense.findByIdAndDelete({ _id: expenseid });
    if (!deletedExpense) {
        return { error: true, message: "Unable to Delete the Expense", status: 500 }
    }
    return { error: false, status: 200, message: "Expense Deleted Successfully", data: deletedExpense }
}


export const UpdateExpense = async (request: Request, expenseid: string) => {
    const ExpenseData = await request.formData();
    if (!ExpenseData) {
        return { status: 400, error: true, message: "Expense data Required" }
    }
    const newReceipt = ExpenseData.get('receipt') as File;
    const oldExpenseData = await expense.findById(expenseid);
    const UpdatedExpensedata: any = {}
    if (newReceipt instanceof File && oldExpenseData?.s3key) {
       
        const filename = newReceipt['name'];
        let imageS3key = `${"Receipts"}/${Date.now()}-${filename}`
        let imagetype = newReceipt['type'];
        if (!newReceipt || !imageS3key) {
            return { status: 400, message: "No File Uploaded", error: true }

        }
        const arrayBuffer = await newReceipt.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await S3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: oldExpenseData.s3key
        }));

        await S3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: imageS3key,
                ContentType: imagetype,
                Body: buffer,
            })
        )
        UpdatedExpensedata.s3key = imageS3key
    }
    const title = ExpenseData.get('title');
    const category = ExpenseData.get('category');
    const description = ExpenseData.get('description');
    const amount = ExpenseData.get('amount');

    if (title) {
        UpdatedExpensedata.title = title
    }
    if (category) {
        UpdatedExpensedata.category = category
    }
    if (description) {
        UpdatedExpensedata.description = description
    }
    if (amount) {
        UpdatedExpensedata.amount = amount
    }
    const ModifiedData = await expense.findByIdAndUpdate(expenseid, UpdatedExpensedata, { new: true });
    if (!ModifiedData) {
        return { status: 404, error: true, message: "Expense Not Found" }
    }
    return { error: false, status: 200, message: "Expense Updated Successfully", data: ModifiedData }

}