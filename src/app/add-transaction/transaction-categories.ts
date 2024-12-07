import { Category } from './interfaces';

export const EXPENSES_CATEGORIES: Category[] = [
  {
    category: 'Housing',
    subcategories: [
      'Rent',
      'Mortgage',
      'Property Taxes',
      'Household Repairs',
      "Homeowner's/Renter's Insurance",
      'Other',
    ],
  },
  {
    category: 'Utilities',
    subcategories: ['Electricity', 'Gas', 'Water', 'Trash', 'Sewer', 'Internet', 'Phone', 'Other'],
  },
  {
    category: 'Food',
    subcategories: ['Groceries', 'Dining Out', 'Takeout', 'Coffee', 'Snacks', 'Other'],
  },
  {
    category: 'Transportation',
    subcategories: [
      'Car Payment',
      'Car Insurance',
      'Gas',
      'Maintenance',
      'Public Transportation',
      'Parking Fees',
      'Ride-Sharing Services',
      'Other',
    ],
  },
  {
    category: 'Health Care',
    subcategories: [
      'Health Insurance',
      'Out-Of-Pocket Medical Costs',
      'Prescriptions',
      'Vitamins',
      'Gym Membership',
      'Other',
    ],
  },
  {
    category: 'Education',
    subcategories: ['Tuition', 'Textbooks', 'School Supplies', 'Student Loan Payments', 'Other'],
  },
  {
    category: 'Personal Care',
    subcategories: ['Clothing', 'Toiletries', 'Cosmetics', 'Haircuts', 'Personal Hygiene', 'Other'],
  },
  {
    category: 'Entertainment',
    subcategories: ['Movies', 'Concerts', 'Sports Events', 'Subscriptions', 'Hobbies', 'Other'],
  },
  {
    category: 'Debt',
    subcategories: ['Credit Card Payments', 'Personal Loan Payments', 'Other'],
  },
  {
    category: 'Savings and Investments',
    subcategories: ['Regular Savings', 'Retirement Savings', 'Investment Contributions', 'Other'],
  },
  {
    category: 'Child Care/Support',
    subcategories: ['Daycare', 'Babyschool', 'Child Support Payments', "Children's Activities", 'Other'],
  },
  {
    category: 'Pet Care',
    subcategories: ['Pet Food', 'Pet Insurance', 'Vet Bills', 'Pet Supplies', 'Other'],
  },
  {
    category: 'Travel',
    subcategories: ['Airfares', 'Hotel Costs', 'Car Rental', 'Vacation Spending', 'Other'],
  },
  {
    category: 'Miscellaneous',
    subcategories: ['Gifts', 'Donations', 'Lottery Tickets', 'Unexpected Expenses', 'Other'],
  },
  {
    category: 'Household Goods',
    subcategories: ['Furniture', 'Appliances', 'Decorations', 'Garden Supplies', 'Other'],
  },
  {
    category: 'Professional Services',
    subcategories: ['Acamountant', 'Lawyer', 'Financial Planner', 'Other'],
  },
  {
    category: 'Taxes',
    subcategories: ['Income Tax', 'Capital Gains Tax', 'Other'],
  },
  {
    category: 'Insurance',
    subcategories: ['Life Insurance', 'Disability Insurance', 'Other'],
  },
  {
    category: 'Home Improvement',
    subcategories: ['Renovations', 'DIY Projects', 'Tools', 'Other'],
  },
  {
    category: 'Consumer Electronics',
    subcategories: ['Computers', 'Smartphones', 'Streaming Devices', 'Video Games', 'Other'],
  },
  {
    category: 'Other',
    subcategories: ['Other'],
  },
];

export const INCOME_CATEGORIES: Category[] = [
  {
    category: 'Salary',
    subcategories: ['Base Salary', 'Overtime Pay', 'Commissions', 'Tips', 'Bonus', 'Other'],
  },
  {
    category: 'Investment',
    subcategories: ['Interest Income', 'Dividends', 'Capital Gains', 'Rental Income', 'Other'],
  },
  {
    category: 'Retirement Income',
    subcategories: ['Pension', 'Social Security', '401k/IRA Distributions', 'Annuity', 'Other'],
  },
  {
    category: 'Business Income',
    subcategories: ['Business Profits', 'Shareholder Profits', 'Other'],
  },
  {
    category: 'Gifts',
    subcategories: ['Cash Gifts', 'Gift Cards', 'Other'],
  },
  {
    category: 'Government Assistance',
    subcategories: ['Unemployment Benefits', 'Food Stamps', 'Welfare', 'Disability', 'Other'],
  },
  {
    category: 'Rental Income',
    subcategories: ['Residential Properties', 'Commercial Properties', 'Other'],
  },
  {
    category: 'Miscellaneous Income',
    subcategories: ['Lottery Winnings', 'Inheritances', 'Insurance Payouts', 'Other'],
  },
  {
    category: 'Other',
    subcategories: ['Other'],
  },
];
