use anchor_lang::prelude::*;
use crate::types::StakingStats;
use crate::accounts_ix::ViewPoolStats;


pub fn view_pool_stats(ctx: Context<ViewPoolStats>) -> Result<StakingStats> {
    let pool = &ctx.accounts.pool;
    Ok(StakingStats {
        total_staked: pool.total_staked,
        total_shares: pool.total_shares,
    })
}
