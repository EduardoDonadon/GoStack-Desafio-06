import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const findTransaction = await transactionsRepository.findOne({
      where: { id },
    });

    if (!findTransaction) {
      throw new AppError('Transaction not found');
    }

    await transactionsRepository.remove(findTransaction);
  }
}

export default DeleteTransactionService;
