import { GROUP_ENDPOINTS } from '../../constants/api-endpoints';
import { CreateGroupInput, Group, JoinGroupInput } from '../../types/group.types';
import { User } from '../../types/auth.types';
import { api } from '../utils/api-client';

interface GroupResponse {
  data: {
    group: Group;
  };
}

interface GroupsResponse {
  data: {
    groups: Group[];
  };
}

interface GroupMembersResponse {
  data: {
    members: Group['members'];
  };
}

interface Balance {
  userId: string;
  balance: number;
}

interface Settlement {
  from: User;
  to: User;
  amount: number;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

interface MonthlyTrend {
  month: string;
  amount: number;
}

interface GroupSummaryResponse {
  data: {
    group: Group;
    balances: Balance[];
    settlements: Settlement[];
    categoryBreakdown: CategoryBreakdown[];
    monthlyTrend: MonthlyTrend[];
  };
}

export const groupService = {
  async fetchGroups(): Promise<Group[]> {
    const response = await api.get<GroupsResponse>(GROUP_ENDPOINTS.LIST);
    return response.data.groups;
  },

  async createGroup(input: CreateGroupInput): Promise<Group> {
    const response = await api.post<GroupResponse>(GROUP_ENDPOINTS.CREATE, input);
    return response.data.group;
  },

  async joinGroup(input: JoinGroupInput): Promise<Group> {
    const response = await api.post<GroupResponse>(GROUP_ENDPOINTS.JOIN, input);
    return response.data.group;
  },

  async fetchGroupById(id: string): Promise<Group> {
    const response = await api.get<GroupResponse>(GROUP_ENDPOINTS.DETAIL(id));
    return response.data.group;
  },

  async inviteToGroup(groupId: string, emails: string[]): Promise<void> {
    await api.post(GROUP_ENDPOINTS.INVITE(groupId), { emails });
  },

  async fetchGroupMembers(groupId: string): Promise<Group['members']> {
    const response = await api.get<GroupMembersResponse>(
      GROUP_ENDPOINTS.MEMBERS(groupId)
    );
    return response.data.members;
  },

  async fetchGroupSummary(groupId: string): Promise<GroupSummaryResponse['data']> {
    const response = await api.get<GroupSummaryResponse>(GROUP_ENDPOINTS.SUMMARY(groupId));
    return response.data;
  },
};
