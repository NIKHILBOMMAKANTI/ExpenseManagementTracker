import expense from "../../lib/models/expenseschema"
import User from "../../lib/models/userschema"
interface Colorpickertype {
    [key: string]: string,
}
interface SpendingByCategoryType {
    category: string,
    amount: number,
    color: string
}
export const getPendingExpenses = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const PendingExpenses = await expense.find({ status: "Pending" });
    if (!PendingExpenses || PendingExpenses.length == 0) {
        return { error: true, message: "No Pending Expenses Found", status: 500 }
    }
    const FilteredExpData = PendingExpenses.map(({ title, description, category, currency, amount, status, createdAt, costCenter }) => {
        let FormatedDate = null;
        if (createdAt) {
            const createdAttoString = createdAt.toISOString();
            const year = createdAttoString.slice(0, 4)
            const month = createdAttoString.slice(5, 7)
            const day = createdAttoString.slice(8, 10);
            FormatedDate = `${day}/${month}/${year}`;
        }

        return {
            "Title": title,
            "Category": category,
            "Currency": currency,
            "Amount": amount,
            "Department": costCenter,
            "Created At": FormatedDate,
            "Status": status
        }
    })
    return { error: false, message: "Pending Expenses Fetched Successfully", data: FilteredExpData, status: 200 }
}


export const ApproveExpense = async (req: Request, expenseid: string) => {
    const payload = req.headers.get("userpayload");

    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    if (!expenseid) {
        return { status: 400, message: "ExpenseId is Required", error: true }
    }
    const ExpenseData = await expense.find({ _id: expenseid });
    if (!ExpenseData || ExpenseData.length == 0) {
        return { status: 404, message: "Expense Not Found", error: true }
    }

    const ApprovedExpenseData = await expense.findByIdAndUpdate(expenseid, { status: "Approved", approverid: id }, { new: true });

    return { error: false, message: "Expense Approved Successfully", data: ApprovedExpenseData, status: 200 }
}

export const RejectExpense = async (req: Request, expenseid: string) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    if (!expenseid) {
        return { status: 400, message: "ExpenseId is Required", error: true }
    }
    const ExpenseData = await expense.find({ _id: expenseid });
    if (!ExpenseData || ExpenseData.length == 0) {
        return { status: 404, message: "Expense Not Found", error: true }
    }
    const RejectedExpenseData = await expense.findByIdAndUpdate(expenseid, { status: "Rejected" }, { new: true });
    return { error: false, message: "Expense Rejected Successfully", data: RejectedExpenseData, status: 200 }
}

export const getRejectedExpense = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const RejectedExpenses = await expense.find({ status: "Rejected" });
    if (!RejectedExpenses || RejectedExpenses.length == 0) {
        return { error: true, message: "No Rejected Expenses Found", status: 500 }
    }
    const FilteredData = await RejectedExpenses.map(({ _id, title, amount, category, status, currency, createdAt, costCenter }) => {
        let FormatedDate = null;
        if (createdAt) {
            const createdAttoString = createdAt.toISOString();
            const year = createdAttoString.slice(0, 4)
            const month = createdAttoString.slice(5, 7)
            const day = createdAttoString.slice(8, 10);
            FormatedDate = `${day}/${month}/${year}`;
        }
        return {
            "id": _id,
            "Title": title,
            "Amount": amount,
            "Currency": currency,
            "Category": category,
            "Department": costCenter,
            "Created At": FormatedDate,
            "Status": status

        }
    })
    return { error: false, message: "Rejected Expenses Fetched Successfully", data: FilteredData, status: 200 }

}

export const getApprovedExpenses = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const ApprovedExpenses = await expense.find({ status: "Approved" });
    if (!ApprovedExpenses || ApprovedExpenses.length == 0) {
        return { error: true, message: "No Approved Expenses Found", status: 500 }
    }
    const FilteredData = ApprovedExpenses.map(({ _id, title, amount, category, status, currency, createdAt, costCenter }) => {
        let FormatedDate = null;
        if (createdAt) {
            const createdAttoString = createdAt.toISOString();
            const year = createdAttoString.slice(0, 4)
            const month = createdAttoString.slice(5, 7)
            const day = createdAttoString.slice(8, 10);
            FormatedDate = `${day}/${month}/${year}`;
        }
        return {
            "id": _id,
            "Title": title,
            "Amount": amount,
            "Currency": currency,
            "Category": category,
            "Department": costCenter,
            "Created At": FormatedDate,
            "Status": status

        }
    })
    return { error: false, message: "Approved Expenses Fetched Successfully", data: FilteredData, status: 200 }
}

export const getDashboardSummary = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const ApprovedData = await getApprovedExpenses(req);
    const RejectedData = await getRejectedExpense(req);
    const PendingData = await getPendingExpenses(req);
    const ApprovedDatalen = (!ApprovedData.data?.length)? 0: ApprovedData.data?.length;
    const RejectedDatalen = (!RejectedData.data?.length) ? 0 : RejectedData.data?.length
    const PendingDatalen = (!PendingData.data?.length)? 0 : PendingData.data?.length;
    const TotalExpenses = ApprovedDatalen! + RejectedDatalen! + PendingDatalen!;
    const DashboardSummaryPayload = [{ name: "Approved", value: ApprovedDatalen, color: "green.solid", icon: "/ApprovedDashboard.png", textcolor: "#00AD45" }, { name: "Rejected", value: RejectedDatalen, color: "red.solid", icon: "/RejectedDashboard.png", textcolor: "#F6110E" }, { name: "Pending", value: PendingDatalen, color: "yellow.solid", icon: "/PendingDashboard.png", textcolor: "#FCC02E;" }]

    return { error: false, message: "Succssfully Fetched Dashboard Summary", data: DashboardSummaryPayload, status: 200 }
}

export const getSpendingByCategory = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const ApprovedExpenses = await getApprovedExpenses(req);
    let Colorpicker: Colorpickertype = {
        "Staff Expenses": '#8bcfc9',
        "Operational Expenses": '#e9c46a',
        "Administrative Expenses": '#f4a261',
        "Travel Expenses": '#e76f51',
        "Project Expenses": '#C6D68F',
        "Miscellaneous Expenses": '#264653',
    }

    const ColorperCategory = await ApprovedExpenses.data?.map((expense: any) => ({
        ...expense,
        color: Colorpicker[expense?.Category] ?? "#888888"
    }));
    const uniqueCategories = new Set(ApprovedExpenses.data?.map((expense: any) => expense.Category))
    const CategoriesArray = [...uniqueCategories];
    let SpendingByCategory: SpendingByCategoryType[] = []
    CategoriesArray.forEach((element) => {
        let totalamountperCategory = 0
        let Spendingcategory = ""
        let CategoryColor = ""
        ColorperCategory?.map((expense) => {
            let category = expense.category;
            Spendingcategory = element;
            if (expense.Category == element) {
                totalamountperCategory += expense.Amount
                CategoryColor = expense?.color
            }
        });
        const categorySpend = {
            category: Spendingcategory,
            amount: totalamountperCategory,
            color: CategoryColor
        }
        SpendingByCategory[SpendingByCategory.length] = categorySpend
    })
    return { error: false, message: "Approved Expenses Fetched Successfully", data: SpendingByCategory, status: 200 }

}