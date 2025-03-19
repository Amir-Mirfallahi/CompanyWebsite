<?php

namespace App\Filament\Admin\Resources\ContactConfigResource\Pages;

use App\Filament\Admin\Resources\ContactConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListContactConfigs extends ListRecords
{
    protected static string $resource = ContactConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
