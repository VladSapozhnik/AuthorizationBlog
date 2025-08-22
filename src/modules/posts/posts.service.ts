import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
    private readonly fileService: FilesService,
  ) {}
  async createPost(createPostDto: CreatePostDto, user: User, image) {
    const fileName: string = await this.fileService.createFile(image);
    return await this.postModel.create({
      ...createPostDto,
      image: fileName,
      userId: user.id,
    });
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
