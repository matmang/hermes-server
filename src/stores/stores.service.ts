import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { DeleteStoreOutput } from './dtos/delete-store.dto';
import { EditStoreInput, EditStoreOutput } from './dtos/edit-store.dto';
import { StoresInput, StoresOutput } from './dtos/stores.dto';
import { Store } from './entities/stores.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly stores: Repository<Store>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createStore(
    owner: User,
    createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    try {
      const newStore = this.stores.create({ ...createStoreInput });
      await this.stores.save(newStore);
      return {
        ok: true,
        storeId: newStore.id,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, error: 'Could not create Store' };
    }
  }

  async editStore(editStoreInput: EditStoreInput): Promise<EditStoreOutput> {
    try {
      const store = await this.stores.findOneOrFail({
        where: { id: editStoreInput.id },
      });
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      await this.stores.save([
        {
          id: editStoreInput.id,
          ...editStoreInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not edit store',
      };
    }
  }

  async deleteStore(storeId: number): Promise<DeleteStoreOutput> {
    try {
      const store = await this.stores.findOne({ where: { id: storeId } });
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      await this.stores.delete(storeId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete Store',
      };
    }
  }

  async allStores({ page }: StoresInput): Promise<StoresOutput> {
    try {
      const [stores, totalResults] = await this.stores.findAndCount({
        skip: (page - 1) * 3,
        take: 3,
      });
      return {
        ok: true,
        stores,
        totalpages: Math.ceil(totalResults / 3),
        totalItems: totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load stores',
      };
    }
  }
}
