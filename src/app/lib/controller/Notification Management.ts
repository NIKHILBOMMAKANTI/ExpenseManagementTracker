import { Transport } from '../utility/NodeMailer';
import { getSpecificExpense } from './ExpenseManagement';
import { getPendingExpenses } from './ApprovalManagement';
import { getDashboardSummary } from './ApprovalManagement';
import { schedule } from 'node-cron';
export const sendNotification = async (expenseid: string) => {
    try {

        if (!expenseid) {
            return { status: 400, message: "ExpenseId is Required", error: true }
        }

        const UserExpenseData = await getSpecificExpense(expenseid);
        if (!UserExpenseData) {
            return { status: 400, message: "Expense Data not Found", error: true }
        }
        await Transport.sendMail({
            from: 'nikhilbommakanti2001@gmail.com',
            to: `${UserExpenseData?.data.userid?.email}`,
            subject: 'Your Expense Status Has Been Updated',
            html: `
        <p>Hello ${UserExpenseData?.data.userid.Firstname} ${UserExpenseData?.data.userid.Lastname},</p>
        <p>The status of your submitted expense titled <strong>${UserExpenseData?.data?.title}</strong> has been updated to <strong>${UserExpenseData?.data?.status}</strong>.</p>
        <p>You can view the full details in your dashboard.</p>
        </br>
        <p>Best Regards,</p>
        <p>${UserExpenseData?.data?.approverid?.Firstname} ${UserExpenseData?.data?.approverid?.Lastname}</p>
        `
        })

        return { error: false, status: 200, message: "Mail Sent Successfully" }
    } catch (error: any) {
        console.log("error", error.message);
    }
}

export const WeeklySummary = async () => {
    const DashboardSummary = await getDashboardSummary();
    const PendingExpenses = await getPendingExpenses();

    const PendingRows = PendingExpenses?.data?.map((PenExp)=>{
      return(
        `<tr>
            <td>${PenExp.title}</td>
            <td>${PenExp.amount}</td>
            <td>${PenExp.status}</td>
        </tr>`);
    }).join('');
    await Transport.sendMail({
        from: 'nikhilbommakanti2001@gmail.com',
        to: 'nikhilbommakanti2001@gmail.com',
        subject: 'Weekly Report from Expense Management Tracker',
        html: `
        <p>Hello Admin,</p>
        <p>Here’s your weekly project approval summary:</p></br>
        <p>Approved Projects:<span>${DashboardSummary?.data["Approved Count"]}</span></p>
        <p>Rejected Projects:<span>${DashboardSummary?.data["Rejected Count"]}</span></p>
        <p>Pending Projects:<span>${DashboardSummary?.data["Pending Count"]}</span></p></br>
        <p>Below are the details of your pending projects:</p>
        <table>
        <tr>
        <th>Title</th>
        <th>Amount</th>
        <th>Status</th>
        </tr>
            ${PendingRows}
        </table>
        `
    })
}

schedule('0 12 * * 1',async ()=>{
    try{
        await WeeklySummary();
    }catch(error:unknown){
        const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
        await Transport.sendMail({
            from: 'nikhilbommakanti2001@gmail.com',
            to: 'nikhilbommakanti2001@gmail.com',
            subject:'Dashboard Summary Delivery Failed',
            html:`
            <p>Hello Team,</p></br>
            <p>This is to inform you that the automated delivery of the Dashboard Summary email has failed.</p>
            <p>Please check the system logs and take necessary action to resolve the issue.</p></br>

            <p>Failed Details</p>
            <p>Error Message:<span>${message}</span></p></br>

            <p>Regards</p>
            <p>Nikhil Bommakanti</p>
            `
        })
    }
})