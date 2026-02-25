declare let userResponse: string | null;
declare function getName(): void;
declare const element: HTMLElement | null;
declare const btnDep: HTMLButtonElement;
declare const btnExp: HTMLButtonElement;
declare const showDep: HTMLButtonElement;
declare const showExp: HTMLButtonElement;
interface User {
    name: string | null;
    balance: number;
    comment: string;
}
declare const userData: User[];
interface Expense {
    amount: number;
    category: string;
    name: string | null;
}
declare const expenseData: Expense[];
declare let balance: number;
declare const depositeAmount: () => void;
declare function Expenses(): void;
declare function showDeposites(): void;
declare let reapeat: boolean;
declare function showExpenses(): void;
declare let isReapeat: boolean;
declare const filteringExpensesByCategory: () => void;
//# sourceMappingURL=index.d.ts.map