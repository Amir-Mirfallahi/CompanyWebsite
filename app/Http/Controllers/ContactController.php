<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Handle the contact form submission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submit(Request $request)
    {
        // Validate the request - we'll keep this flexible since form fields are dynamic
        $validator = Validator::make($request->all(), [
            // We can add specific validation rules if needed
            // For example: 'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'خطا در اطلاعات وارد شده',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Get admin email from config or env
            $adminEmail = config('mail.admin_email', env('ADMIN_EMAIL', 'admin@example.com'));

            // Send the email
            Mail::to($adminEmail)->send(new ContactFormMail($request->all()));

            return response()->json([
                'message' => 'پیام شما با موفقیت ارسال شد',
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error sending contact email: ' . $e->getMessage());

            return response()->json([
                'message' => 'متأسفانه در ارسال پیام مشکلی پیش آمد. لطفا بعدا دوباره تلاش کنید.',
            ], 500);
        }
    }
}
