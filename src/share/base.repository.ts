import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export abstract class BaseRepositoryAbstract<T extends object> {
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | any) {
    try {
      const created_data = await this.model.create(dto);
      return (await created_data.save()) as unknown as T;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneById(id: string) {
    return this.model
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .lean();
  }

  async findOne(condition: FilterQuery<T>) {
    return this.model
      .findOne({
        ...condition,
        deletedAt: null,
      })
      .lean();
  }

  async findAll(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const [count, items] = await Promise.all([
      this.model.countDocuments({ ...condition, deletedAt: null }),
      this.model.find(
        { ...condition, deletedAt: null },
        options?.projection,
        options,
      ),
    ]);
    return {
      count,
      items,
    };
  }

  async update(id: string, payload: FilterQuery<T>) {
    return await this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(id), deletedAt: null },
      payload,
      {
        new: true,
      },
    );
  }

  async softDelete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }

    return !!(await this.model
      .findByIdAndUpdate<T>(id, { deletedAt: new Date() })
      .exec());
  }

  async delete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id);
    if (!delete_item) {
      return false;
    }
    return !!(await this.model.findByIdAndDelete(id));
  }

  getModel() {
    return this.model;
  }
}
