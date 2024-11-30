import { Service } from 'typedi';

import { AppDataSource } from '../../data-source';
import { NewCardData } from '../../dto/cards';
import { Cards } from '../../entity/Cards';
import { Sets } from '../../entity/Sets';
import { User } from '../../entity/User';
import { IVocabularyCardRepo } from './IVocabularyCardRepo';

@Service()
export class VocabularyCardRepo implements IVocabularyCardRepo {
  private setDataSource = AppDataSource.getRepository(Sets);
  private cardDataSource = AppDataSource.getRepository(Cards);

  async create_card(
    user: User,
    set: Sets,
    card: NewCardData,
  ): Promise<Cards | null> {
    const newCard = new Cards();
    newCard.term = card?.term;
    newCard.define = card?.define;
    newCard.image = card?.image;
    newCard.example = card?.example || '';
    newCard.set = set;
    newCard.created_by = user.username;
    return await this.cardDataSource.save(newCard);
  }

  async edit_card(card: Cards): Promise<Cards | null> {
    card.updated_at = new Date();
    return this.cardDataSource.save(card);
  }

  async delete_card(cardId: string): Promise<any> {
    const result = await this.cardDataSource.delete({ id: cardId });
    if (result.affected) {
      return true;
    }
    return false;
  }

  async isExistCard(id: string): Promise<boolean> {
    const card = await this.cardDataSource.findOneBy({
      id: id,
    });
    if (card) {
      return true;
    }
    return false;
  }

  async getCardById(id: string): Promise<Cards | null> {
    const card = await this.cardDataSource.findOne({
      where: {
        id: id,
      },
      relations: ['set'],
    });
    return card;
  }
}
