use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Unstake delay not satisfied")]
    UnstakeDelay,
    #[msg("Withdraw already started")]
    WithdrawAlreadyStarted,
    #[msg("Withdraw not started")]
    WithdrawNotStarted,
}
