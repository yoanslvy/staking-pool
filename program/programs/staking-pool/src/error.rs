use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Unstake delay not satisfied")]
    UnstakeDelay,
}
