<?php

namespace App\Filament\Admin\Resources\ConfigResource\Pages;

use App\Filament\Admin\Resources\ConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListConfigs extends ListRecords
{
    protected static string $resource = ConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
