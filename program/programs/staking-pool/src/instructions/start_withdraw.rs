use anchor_lang::prelude::*;
use crate::accounts_ix::StartWithdraw;
use crate::error::CustomError;

pub fn start_withdraw(ctx: Context<StartWithdraw>) -> Result<()> {
    let clock = Clock::get()?;
    let user = &mut ctx.accounts.user;

    require!(user.withdraw_requested_at.is_none(), CustomError::WithdrawAlreadyStarted);

    user.withdraw_requested_at = Some(clock.unix_timestamp.try_into().unwrap());
    Ok(())
}