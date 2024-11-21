import { Expense } from 'model/types';
import { Section } from './types';

export const orderedExpensesSectionData = (expenses: Expense[]): Section[] =>
  Object.values(
    expenses.reduce(
      (acc: Record<string, Section>, { id, title, date, amount }) => {
        acc[date] = acc[date] || { date, data: [] };
        acc[date].data.push({ id, title, amount, date });
        return acc;
      },
      {},
    ),
  );
