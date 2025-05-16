import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/entry.dto';
import { User } from '../user/user.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async createEntry(
    createEntryDto: CreateEntryDto,
    user: User,
  ): Promise<Entry> {
    const entry = this.entriesRepository.create({
      ...createEntryDto,
      user,
    });
    return this.entriesRepository.save(entry);
  }

  async findAll(user: User): Promise<Entry[]> {
    return this.entriesRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: string, user: User): Promise<Entry> {
    const entry = await this.entriesRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!entry) throw new NotFoundException('Entry not found');
    return entry;
  }

  async updateEntry(
    id: string,
    updateEntryDto: UpdateEntryDto,
    user: User,
  ): Promise<Entry> {
    const entry = await this.findOne(id, user); // checks ownership & existence
    Object.assign(entry, updateEntryDto);
    return this.entriesRepository.save(entry);
  }

  async removeEntry(id: string, user: User): Promise<void> {
    const entry = await this.findOne(id, user); // ownership & existence check
    await this.entriesRepository.remove(entry);
  }
}
