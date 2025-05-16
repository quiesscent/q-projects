import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users') // Groups this under "Users"
@ApiBearerAuth() // Tells Swagger to expect a Bearer Token (JWT)
@Controller('users')
export class UserController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile (JWT protected)' })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid token',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
