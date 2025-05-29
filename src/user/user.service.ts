import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user-dto';
import { HashingService } from 'src/common/hashing/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(dto: CreateUserDto) {
    //email precisa ser único
    const emailExists = await this.userRepository.exists({
      where: { email: dto.email },
    });
    if (emailExists) {
      throw new ConflictException(
        `Email already exists. Please use a different email.`,
      );
    }
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

  save(user: User) {
    return this.userRepository.save(user);
  }
}
