use anchor_lang::prelude::*;
use crate::state::*;
#[derive(Accounts)]
pub struct StartWithdraw<'info> {
    #[account(mut)]
    pub user: Account<'info, UserStake>,
}