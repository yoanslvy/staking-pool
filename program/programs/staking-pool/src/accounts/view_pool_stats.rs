use anchor_lang::prelude::*;
use crate::state::*;


#[derive(Accounts)]
pub struct ViewPoolStats<'info> {
    pub pool: Account<'info, StakingPool>,
}
