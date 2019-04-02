(defun printHello(name)
  (princ "hello ")
  (princ name)
)

(printHello(read-line))