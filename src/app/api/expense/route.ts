import DBConnection from  "../../lib/db/dbconnection";
import { addExpense, getAllExpenses } from  "../../lib/controller/ExpenseManagement"




export async function POST(request: Request) {
    try {
        await DBConnection();
        const newExpenseData = await addExpense(request);
        return new Response(JSON.stringify(newExpenseData), { status: newExpenseData.status })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export async function GET() {
    try {
        await DBConnection();
        const ExpenseData = await getAllExpenses();
        return new Response(JSON.stringify(ExpenseData), { status: ExpenseData.status })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

