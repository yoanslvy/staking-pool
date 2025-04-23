use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct ViewUserRewards<'info> {
    pub user: Account<'info, UserStake>,
    pub pool: Account<'info, StakingPool>,
}