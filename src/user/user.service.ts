import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user-dto';
import { HashingService } from 'src/common/hashing/hash.service';
import { UpdateUserDto } from './dto/update.user-dto';
import { UpdatePassWordDto } from './dto/update-password-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async failIfEmailExist(email: string) {
    const emailExists = await this.userRepository.existsBy({
      email,
    });
    if (emailExists) {
      throw new ConflictException(
        `Email already exists. Please use a different email.`,
      );
    }
  }

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.userRepository.findOneBy(userData);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    //email precisa ser único
    await this.failIfEmailExist(dto.email);
    //precisamos fazer o hash da senha antes de salvar o usuário
    const hashedPassword = await this.hashingService.hash(dto.password);
    const newUser: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword, // substituindo a senha pelo hash
    };
    // depois salvar o usuário no banco de dados
    const created = await this.userRepository.save(newUser);
    return created;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  findById(id: string) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!dto.name && !dto.email) {
      throw new BadRequestException('Data is empty');
    }

    const user = await this.findOneByOrFail({ id });

    user.name = dto.name ?? user.name;

    if (dto.email && dto.email !== user.email) {
      await this.failIfEmailExist(dto.email);
      user.email = dto.email;
      user.forceLogout = true;
    }

    return this.save(user);
  }

  async updatePassword(id: string, dto: UpdatePassWordDto) {
    const user = await this.findOneByOrFail({ id });

    const isCurrentPasswordValid = await this.hashingService.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const isSameAsOldPassword = await this.hashingService.compare(
      dto.newPassword,
      user.password,
    );

    if (isSameAsOldPassword) {
      throw new BadRequestException(
        'New password must be different from the current one',
      );
    }

    user.password = await this.hashingService.hash(dto.newPassword);
    user.forceLogout = true;

    return this.save(user);
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
