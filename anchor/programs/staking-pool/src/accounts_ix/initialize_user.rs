use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + UserStake::SIZE,
        seeds = [b"user", payer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserStake>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}