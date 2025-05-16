import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { EntriesService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/entry.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('entries')
@ApiBearerAuth() // JWT token in header
@Controller('entries')
@UseGuards(JwtAuthGuard) // protect all routes in this controller
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new entry' })
  @ApiBody({ type: CreateEntryDto })
  @ApiResponse({ status: 201, description: 'Entry created successfully.' })
  async create(@Body() createEntryDto: CreateEntryDto, @Request() req) {
    return this.entriesService.createEntry(createEntryDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entries for the logged in user' })
  @ApiResponse({ status: 200, description: 'List of entries returned.' })
  async findAll(@Request() req) {
    return this.entriesService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific entry by ID' })
  @ApiParam({ name: 'id', description: 'Entry ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Entry returned.' })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.entriesService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an entry by ID' })
  @ApiParam({ name: 'id', description: 'Entry ID', type: 'string' })
  @ApiBody({ type: UpdateEntryDto })
  @ApiResponse({ status: 200, description: 'Entry updated successfully.' })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
    @Request() req,
  ) {
    return this.entriesService.updateEntry(id, updateEntryDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an entry by ID' })
  @ApiParam({ name: 'id', description: 'Entry ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Entry deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.entriesService.removeEntry(id, req.user);
    return { message: 'Entry deleted successfully' };
  }
}
