import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Domain, DomainDocument } from 'src/database/schemas/domain.schema';
import { DomainDto } from './dto/domain.dto';
import { DomainListDto } from './dto/domainList.dto';
import { DomainQueryDto } from './dto/domainQuery.dto';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(Domain.name)
    public domainModel: Model<DomainDocument>,
  ) {}

  async createDomain(domain: DomainDto): Promise<DomainDto> {
    await this.checkDomainNameUniqueness(domain.domainName);
    const createdDomain = await this.domainModel.create({ ...domain });
    return createdDomain;
  }

  async getAllDomains(query: DomainQueryDto): Promise<DomainListDto> {
    const limit = Number(query.size) || 15;
    const skip = (query.offset - 1) * limit || 0;

    const total = await this.domainModel.countDocuments();

    const domains = await this.domainModel.find().skip(skip).limit(limit);
    return { domains, total };
  }

  async updateDomain(domain: DomainDto) {
    const { _id, ...restData } = domain;
    await this.checkDomainNameUniqueness(domain.domainName, _id);

    const updatedDomain = await this.domainModel.findOneAndUpdate(
      {
        _id,
      },
      { ...restData },
    );
    return updatedDomain;
  }

  async getOwnersAllDomains(ownerId: Types.ObjectId): Promise<DomainDto[]> {
    return await this.domainModel.find({ ownerId });
  }

  async domainsFuzzySearch(search: string): Promise<DomainDto[]> {
    return await this.domainModel.find({
      domainName: { $regex: search, $options: 'i' },
    });
  }

  private async checkDomainNameUniqueness(
    domainName: string,
    _id?: Types.ObjectId,
  ): Promise<void> {
    const domain = await this.domainModel.findOne({
      domainName,
    });
    if (_id && domain && _id.toString() !== domain?._id.toString())
      throw new NotAcceptableException('Domain Name already exist');
    if (!_id && domain)
      throw new NotAcceptableException('Domain Name already exist');
  }
}
