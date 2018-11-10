<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\FatalErrorExceptions;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpFoundation\Response as HttpExceptionResponse;

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
    
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException) { //CATCH ERRORS
            $code = isset(HttpExceptionResponse::$statusTexts[$e->getStatusCode()]) ? HttpExceptionResponse::$statusTexts[$e->getStatusCode()] : NULL;
            return $this->error($e->getStatusCode(), $code);
        }

        // if ($e instanceof \Symfony\Component\HttpKernel\Exception\FatalErrorExceptions) {
        //     $code = isset(HttpExceptionResponse::$statusTexts[$e->getStatusCode()]) ? HttpExceptionResponse::$statusTexts[$e->getStatusCode()] : NULL;
        //     return $this->error($e->getStatusCode(), $code);
        // }

        return parent::render($request, $e);
    }

    public static function error($code = 400, $message ) //ERROR RESPONSE
    {
        if( NULL === $message ){
            $message = "Unkonwn Error";
        }
        if (is_object($message)) { $message = $message->toArray(); }

        $data = array(
                'code'    => $code,
                'message'   => $message
        );

        return response()->json(['errors' => array($data)],$code);
    }
}
