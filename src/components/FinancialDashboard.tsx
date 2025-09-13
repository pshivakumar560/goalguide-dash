import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PieChart, 
  AlertTriangle,
  CreditCard,
  Wallet,
  Bell,
  Calendar
} from "lucide-react";

// Mock data for the financial dashboard
const mockTransactions = [
  { id: 1, description: "Grocery Store", amount: -85.50, category: "Food", date: "2024-01-15", predicted: false },
  { id: 2, description: "Salary", amount: 3500.00, category: "Income", date: "2024-01-14", predicted: false },
  { id: 3, description: "Netflix", amount: -15.99, category: "Entertainment", date: "2024-01-13", predicted: false },
  { id: 4, description: "Gas Station", amount: -55.20, category: "Transportation", date: "2024-01-12", predicted: false },
  { id: 5, description: "Coffee Shop", amount: -4.50, category: "Food", date: "2024-01-11", predicted: false },
];

const mockGoals = [
  { id: 1, name: "Emergency Fund", target: 10000, current: 6500, deadline: "2024-12-31" },
  { id: 2, name: "Vacation", target: 3000, current: 1200, deadline: "2024-06-01" },
  { id: 3, name: "Car Down Payment", target: 5000, current: 2800, deadline: "2024-08-15" },
];

const mockBudgets = [
  { category: "Food", spent: 450, budget: 600, color: "bg-accent" },
  { category: "Transportation", spent: 280, budget: 300, color: "bg-info" },
  { category: "Entertainment", spent: 120, budget: 200, color: "bg-warning" },
  { category: "Shopping", spent: 350, budget: 250, color: "bg-destructive" },
];

export function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalBalance = 15420.50;
  const monthlyIncome = 3500.00;
  const monthlyExpenses = 2280.50;
  const predictedSpending = 2450.00;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
            <p className="text-muted-foreground">AI-powered expense tracking and financial insights</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Bell className="w-4 h-4 mr-2" />
            Alerts (3)
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">${totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${monthlyIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Regular salary</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${monthlyExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">-12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predicted Spending</CardTitle>
              <PieChart className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">${predictedSpending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">AI forecast for next month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                    Budget Alerts
                  </CardTitle>
                  <CardDescription>Categories requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockBudgets.filter(budget => budget.spent / budget.budget > 0.8).map((budget, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{budget.category}</p>
                        <p className="text-sm text-muted-foreground">
                          ${budget.spent} of ${budget.budget}
                        </p>
                      </div>
                      <Badge variant={budget.spent > budget.budget ? "destructive" : "default"}>
                        {Math.round((budget.spent / budget.budget) * 100)}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Goal Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-accent" />
                    Goal Progress
                  </CardTitle>
                  <CardDescription>Track your financial goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockGoals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${goal.current} / ${goal.target}
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Spending Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>AI Spending Analysis</CardTitle>
                <CardDescription>Insights based on your transaction patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <h4 className="font-semibold text-accent mb-2">Trend Detection</h4>
                    <p className="text-sm text-muted-foreground">
                      Your food expenses have increased by 15% this month. Consider meal planning to optimize spending.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <h4 className="font-semibold text-info mb-2">Smart Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      You typically spend more on weekends. Setting a weekend budget could help control expenses.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <h4 className="font-semibold text-warning mb-2">Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your patterns, you could save $200/month by optimizing subscription services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>AI-categorized expenses and income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.amount > 0 ? 'bg-success' : 'bg-destructive'
                        }`} />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {goal.name}
                      <Target className="w-5 h-5 text-accent" />
                    </CardTitle>
                    <CardDescription>Target: ${goal.target.toLocaleString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>${goal.current.toLocaleString()}</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Add Contribution
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockBudgets.map((budget, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {budget.category}
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>
                      ${budget.spent} of ${budget.budget} spent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress 
                      value={(budget.spent / budget.budget) * 100} 
                      className="h-3"
                    />
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant={budget.spent > budget.budget ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {Math.round((budget.spent / budget.budget) * 100)}% used
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ${budget.budget - budget.spent} remaining
                      </span>
                    </div>
                    {budget.spent > budget.budget && (
                      <div className="flex items-center p-2 rounded bg-destructive/10 text-destructive text-sm">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Budget exceeded by ${budget.spent - budget.budget}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}