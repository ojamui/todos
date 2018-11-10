<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof ModelNotFoundException) {
            $e = new NotFoundHttpException($e->getMessage(), $e);
        }
    
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) { //CATCH ERRORS
            return $this->error(405, 'Method Not Allowed');
        }

        return parent::render($request, $e);
    }

    public static function error($code = 400, $message = null) //ERROR RESPONSE
    {
        // check if $message is object and transforms it into an array
        if (is_object($message)) { $message = $message->toArray(); }

        switch ($code) {
            case 405:
                $code_message = 'Method Not Allowed';
                break;
            default:
                $code_message = 'error_occured';
                break;
        }

        $data = array(
                'code'    => $code,
                'title'   => $code_message
        );

        // return an error
        return response()->json(['errors' => array($data)],$code);
    }
}
