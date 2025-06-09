import { User } from './auth.types';

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  totalExpenses: number;
  yourBalance: number;
  inviteCode: string;
}

export interface CreateGroupInput {
  name: string;
  description: string;
}

export interface JoinGroupInput {
  inviteCode: string;
}

export interface GroupsState {
  groups: Group[];
  isLoading: boolean;
  error: string | null;
}

export interface GroupContextType extends GroupsState {
  createGroup: (input: CreateGroupInput) => Promise<Group>;
  joinGroup: (input: JoinGroupInput) => Promise<Group>;
  fetchGroups: () => Promise<Group[]>;
  fetchGroupById: (id: string) => Promise<Group>;
}

export interface GroupMember {
  user: User
  role: "admin" | "member"
  joinedAt: Date
}

export interface GroupBalance {
  userId: string
  balance: number
}

export interface GroupSummary {
  group: Group
  balances: GroupBalance[]
  settlements: Settlement[]
  categoryBreakdown: CategoryBreakdown[]
  monthlyTrend: MonthlyTrend[]
}

export interface Settlement {
  from: User
  to: User
  amount: number
}

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
}

export interface MonthlyTrend {
  month: string
  amount: number
}
