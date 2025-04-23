use anchor_lang::prelude::*;
use crate::accounts_ix::ViewUserRewards;
use crate::types::StakingStats;

pub fn view_user_rewards(ctx: Context<ViewUserRewards>) -> Result<StakingStats> {
    let user = &ctx.accounts.user;
    Ok(StakingStats {
        total_staked: user.amount_staked,
        total_shares: user.shares
    })
}