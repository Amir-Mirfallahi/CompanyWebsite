<?php

namespace App\Filament\Admin\Resources\SpecResource\Pages;

use App\Filament\Admin\Resources\SpecResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSpec extends EditRecord
{
    protected static string $resource = SpecResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
