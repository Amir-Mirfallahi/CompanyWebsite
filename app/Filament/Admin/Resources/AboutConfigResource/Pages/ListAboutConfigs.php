<?php

namespace App\Filament\Admin\Resources\AboutConfigResource\Pages;

use App\Filament\Admin\Resources\AboutConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAboutConfigs extends ListRecords
{
    protected static string $resource = AboutConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
