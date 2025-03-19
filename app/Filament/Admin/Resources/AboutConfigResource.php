<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\AboutConfigResource\Pages;
use App\Filament\Admin\Resources\AboutConfigResource\RelationManagers;
use App\Models\AboutConfig;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AboutConfigResource extends Resource
{
    protected static ?string $model = AboutConfig::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('hero_img_src')
                    ->image()
                    ->directory('config_image')
                    ->acceptedFileTypes(['image/*'])
                    ->required(),
                Forms\Components\TextInput::make('hero_title')
                    ->required(),
                Forms\Components\TextInput::make('hero_subtitle')
                    ->required(),
                Forms\Components\TextInput::make('story_subtitle')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('hero_img_src')
                    ->searchable(),
                Tables\Columns\TextColumn::make('hero_title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('hero_subtitle')
                    ->searchable(),
                Tables\Columns\TextColumn::make('story_subtitle')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAboutConfigs::route('/'),
            'create' => Pages\CreateAboutConfig::route('/create'),
            'edit' => Pages\EditAboutConfig::route('/{record}/edit'),
        ];
    }
}