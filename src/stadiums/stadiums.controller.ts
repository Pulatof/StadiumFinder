import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { OwnerGuard } from 'src/guards/owner.guard';

@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @UseGuards(OwnerGuard)
  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @UseGuards(OwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }


  @UseGuards(OwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
