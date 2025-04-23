use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user_wallet: Signer<'info>,

    #[account(mut)]
    /// CHECK: stake account vault
    pub stake_account: AccountInfo<'info>,

    #[account(mut)]
    pub pool: Account<'info, StakingPool>,

    #[account(
        init_if_needed,
        payer = user_wallet,
        space = 8 + UserStake::SIZE,
        seeds = [b"user", user_wallet.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserStake>,

    pub system_program: Program<'info, System>,
}
