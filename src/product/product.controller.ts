import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.productService.getAll(searchTerm);
	}

	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug);
	}

	@Get('by-category/:categorySlug')
	async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createProduct() {
		return this.productService.create();
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@HttpCode(200)
	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(id, dto);
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(id);
	}
}
