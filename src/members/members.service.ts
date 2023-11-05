import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member: Member = new Member();
    member.nickname = createMemberDto.nickname;
    member.age = createMemberDto.age;
    const res: Member = await this.membersRepository.save(member);
    return res;
  }

  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    const res: Member | null = await this.membersRepository.findOneBy({ id });
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member: Member | null = await this.findOne(id);
    if (!member) {
      throw new NotFoundException();
    }
    member.nickname = updateMemberDto.nickname;
    member.age = updateMemberDto.age;
    const res: Member = await this.membersRepository.save(member);
    return res;
  }

  async remove(id: number): Promise<void> {
    await this.membersRepository.softDelete({ id });
  }
}
