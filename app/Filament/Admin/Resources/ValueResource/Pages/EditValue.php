<?php

namespace App\Filament\Admin\Resources\ValueResource\Pages;

use App\Filament\Admin\Resources\ValueResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditValue extends EditRecord
{
    protected static string $resource = ValueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
