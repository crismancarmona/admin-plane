#!/bin/sh

# Inicializar Terraform
terraform init

# Planificar la ejecución de Terraform
terraform plan

# Aplicar la configuración de Terraform
terraform apply -auto-approve -no-color

# Mantener el contenedor en ejecución
tail -f /dev/null