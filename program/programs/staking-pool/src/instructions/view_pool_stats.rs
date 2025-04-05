use anchor_lang::prelude::*;
use crate::types::PoolStats;
use crate::accounts_ix::ViewPoolStats;

pub fn view_pool_stats(ctx: Context<ViewPoolStats>) -> Result<PoolStats> {
    let pool = &ctx.accounts.pool;
    Ok(PoolStats {
        total_staked: pool.total_staked,
        total_shares: pool.total_shares,
    })
}
