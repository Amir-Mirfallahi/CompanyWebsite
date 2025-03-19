<?php

namespace App\Filament\Admin\Resources\ContactConfigResource\Pages;

use App\Filament\Admin\Resources\ContactConfigResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateContactConfig extends CreateRecord
{
    protected static string $resource = ContactConfigResource::class;
}
