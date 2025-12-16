import DBConnection from  "../../lib/db/dbconnection";
import { addExpense, getAllExpenses } from  "../../lib/controller/ExpenseManagement"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await DBConnection();
        const newExpenseData = await addExpense(request);
        return  NextResponse.json(newExpenseData, { status: newExpenseData.status ?? 500})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET() {
    try {
        await DBConnection();
        const ExpenseData = await getAllExpenses();
        return NextResponse.json(ExpenseData, { status: ExpenseData.status ?? 500})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

