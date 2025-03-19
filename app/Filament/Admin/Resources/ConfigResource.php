<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\ConfigResource\Pages;
use App\Filament\Admin\Resources\ConfigResource\RelationManagers;
use App\Models\Config;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ConfigResource extends Resource
{
    protected static ?string $model = Config::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Config')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('اطلاعات پایه')
                            ->schema([
                                Forms\Components\FileUpload::make('logo_src')
                                    ->image()
                                    ->acceptedFileTypes(['image/*'])
                                    ->required(),
                                Forms\Components\TextInput::make('site_name')
                                    ->required(),
                                Forms\Components\TextInput::make('site_slogan')
                                    ->required(),
                                Forms\Components\TextInput::make('hero_title')
                                    ->required(),
                                Forms\Components\TextInput::make('hero_subtitle')
                                    ->required(),
                                Forms\Components\FileUpload::make('hero_img_src')
                                    ->image()
                                    ->directory('config_image')
                                    ->acceptedFileTypes(['image/*'])
                                    ->required(),
                                Forms\Components\TextInput::make('address')
                                    ->required(),
                                Forms\Components\TextInput::make('telephone')
                                    ->tel()
                                    ->required(),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required(),
                                Forms\Components\TextInput::make('instagram'),
                                Forms\Components\TextInput::make('linkedin'),
                            ]),
                        Forms\Components\Tabs\Tab::make('آمار و ارقام')
                            ->schema([
                                Forms\Components\Repeater::make('statistics')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')
                                            ->label('عنوان')
                                            ->required(),
                                        Forms\Components\TextInput::make('value')
                                            ->label('مقدار')
                                            ->numeric()
                                            ->required(),
                                        Forms\Components\TextInput::make('suffix')
                                            ->label('پسوند')
                                            ->placeholder('مثال: +، %، K و غیره'),
                                        Forms\Components\Select::make('icon')
                                            ->label('آیکون')
                                            ->options([
                                                'calendar' => 'تقویم',
                                                'users' => 'کاربران',
                                                'clipboard-check' => 'چک لیست',
                                                'cube' => 'مکعب',
                                                'star' => 'ستاره',
                                                'chart-bar' => 'نمودار',
                                                'globe' => 'کره زمین',
                                                'badge-check' => 'تیک',
                                                'heart' => 'قلب',
                                                'briefcase' => 'کیف',
                                                'light-bulb' => 'لامپ',
                                                'clock' => 'ساعت',
                                            ])
                                            ->required(),
                                    ])
                                    ->columnSpanFull()
                                    ->defaultItems(4)
                                    ->reorderable()
                                    ->collapsible()
                                    ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('logo_src')
                    ->searchable(),
                Tables\Columns\TextColumn::make('site_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('site_slogan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('hero_title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('hero_subtitle')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('hero_img_src')
                    ->searchable(),
                Tables\Columns\TextColumn::make('address')
                    ->searchable(),
                Tables\Columns\TextColumn::make('telephone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('instagram')
                    ->searchable(),
                Tables\Columns\TextColumn::make('linkedin')
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
            'index' => Pages\ListConfigs::route('/'),
            'create' => Pages\CreateConfig::route('/create'),
            'edit' => Pages\EditConfig::route('/{record}/edit'),
        ];
    }
}
