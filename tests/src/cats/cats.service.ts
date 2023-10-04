import { Injectable } from '@nestjs/common';
import { InjectDbContextModel } from '../../../lib';
import { Model } from 'mongoose';
import { ICat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectDbContextModel('Cat') private readonly catModel: Model<ICat>) {}

  async create(createCatDto: CreateCatDto): Promise<ICat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<ICat[]> {
    return this.catModel.find().exec();
  }
}
