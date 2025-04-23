use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, stake};
use crate::accounts_ix::InitializeUser;
use crate::error::*;

pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.user = ctx.accounts.payer.key(); 
    user.amount_staked = 0;
    user.shares = 0;
    user.withdraw_requested_at = None;
    Ok(())
}