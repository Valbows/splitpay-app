/**
 * Convert Supabase UUID to stable integer ID for frontend
 * @param {string} uuid - UUID from database
 * @return {number} - Integer ID for frontend
 */
function uuidToIntegerId(uuid) {
  if (!uuid) return null;
  // Create deterministic integer from UUID (will be consistent for same UUID)
  return parseInt(uuid.replace(/-/g, '').substring(0, 8), 16) % 1000000;
}

/**
 * Transform user data from auth.users to frontend format
 */
function transformUserToFrontendFormat(supabaseUser) {
  if (!supabaseUser) return null;

  return {
    id: uuidToIntegerId(supabaseUser.id),
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email,
    avatar_url: supabaseUser.user_metadata?.avatar_url || null,
    created_at: supabaseUser.created_at,
    updated_at: supabaseUser.updated_at || supabaseUser.created_at
  };
}

/**
 * Transform group data to frontend format
 */
function transformGroupToFrontendFormat(group) {
  if (!group) return null;

  return {
    id: uuidToIntegerId(group.id),
    name: group.name,
    description: group.description || '',
    category: group.category || 'General',
    created_by_user_id: uuidToIntegerId(group.created_by_user_id),
    created_at: group.created_at,
    updated_at: group.updated_at || group.created_at
  };
}

/**
 * Transform participant to group_member format
 */
function transformParticipantToMemberFormat(participant) {
  if (!participant) return null;

  return {
    id: uuidToIntegerId(participant.id),
    group_id: uuidToIntegerId(participant.group_id),
    user_id: uuidToIntegerId(participant.user_id),
    role: participant.role || 'member',
    joined_at: participant.joined_at || participant.created_at
  };
}

/**
 * Transform expense data to frontend format
 */
function transformExpenseToFrontendFormat(expense) {
  if (!expense) return null;

  return {
    id: uuidToIntegerId(expense.id),
    description: expense.description,
    amount: expense.amount,
    group_id: uuidToIntegerId(expense.group_id),
    paid_by_user_id: uuidToIntegerId(expense.paid_by_user_id),
    receipt_url: expense.image_url || null,
    notes: expense.notes || '',
    created_at: expense.created_at,
    updated_at: expense.updated_at || expense.created_at
  };
}

module.exports = {
  uuidToIntegerId,
  transformUserToFrontendFormat,
  transformGroupToFrontendFormat,
  transformParticipantToMemberFormat,
  transformExpenseToFrontendFormat
};
