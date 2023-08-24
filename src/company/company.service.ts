import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Company>> {
    return paginate<Company>(this.companyRepository, options);
  }

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: number) {
    return this.companyRepository.findOneBy({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (company) {
      const { companyName, isActive } = updateCompanyDto;
      company.companyName = companyName || company.companyName;
      company.isActive = isActive ?? company.isActive;
      await this.companyRepository.save(company);
    }
    return company;
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
