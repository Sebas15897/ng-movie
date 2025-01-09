import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = environment.theMovieDbToken;

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  return next(clonedRequest).pipe(
    catchError((error) => {
      handleError(error);
      return throwError(() => error);
    })
  );
};

function handleError(error: any): void {
  const status = error.status;

  let title = 'Error';
  let text = 'Ha ocurrido un error inesperado.';

  if (status === 401) {
    title = 'Autenticación fallida';
    text = 'El token proporcionado no es válido o ha expirado.';
  } else if (status === 404) {
    title = 'Recurso no encontrado';
    text = 'La película o recurso que buscas no existe.';
  } else if (status >= 500) {
    title = 'Error del servidor';
    text = 'Ocurrió un problema con el servidor. Intenta más tarde.';
  }

  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Aceptar',
  });
}
