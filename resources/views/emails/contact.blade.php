@component('mail::message')
# پیام جدید از فرم تماس

<div dir="rtl" style="text-align: right; font-family: Tahoma, Arial, sans-serif;">
    <p style="font-size: 16px; color: #333;">یک پیام جدید از طریق فرم تماس وبسایت شرکت دریافت شده است:</p>

    <div
        style="background-color: #f7f9fc; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #e3e8f0;">
        @foreach($formData as $key => $value)
        @if(!empty($value))
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eaeef3; padding-bottom: 10px;">
            <span style="font-weight: bold; color: #3b5998; display: block; margin-bottom: 5px;">{{ ucfirst($key)
                }}:</span>
            <span style="color: #333;">{{ $value }}</span>
        </div>
        @endif
        @endforeach
    </div>

    <p style="color: #666; margin-top: 30px; font-size: 14px;">
        این ایمیل به صورت خودکار از سیستم مدیریت محتوای وبسایت ارسال شده است.
        <br>
        تاریخ و زمان ارسال: {{ now()->format('Y-m-d H:i:s') }}
    </p>
</div>

@component('mail::button', ['url' => config('app.url'), 'color' => 'primary'])
مشاهده وبسایت
@endcomponent

با احترام,<br>
{{ config('app.name') }}
@endcomponent